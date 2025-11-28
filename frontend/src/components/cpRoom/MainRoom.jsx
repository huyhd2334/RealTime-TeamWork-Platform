import React, { useState, useEffect, useRef } from "react";
import Video from "twilio-video";
import api from "@/lib/axios";
import { toast } from "sonner";

const MainRoom = ({ roomCode }) => {
  const localVideoRef = useRef();
  const remoteVideosRef = useRef();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!roomCode) return;

    const joinRoom = async () => {
      try {
        toast.success("Joined room: " + roomCode);

        const identity = `user_${Math.floor(Math.random() * 10000)}`;
        const res = await api.get(`/tokentwilio?room=${roomCode}&identity=${identity}`);
        const token = res.data.token;

        const room = await Video.connect(token, {
          audio: true,
          video: { width: 640 },
        });

        setRoom(room);

        /** Attach local */
        const localTrack = Array.from(room.localParticipant.videoTracks.values())[0].track;
        localTrack.attach(localVideoRef.current);

        /** Attach participants already in room */
        room.participants.forEach(p => attachParticipant(p, room));

        /** When new participant joins */
        room.on("participantConnected", p => attachParticipant(p, room));

        /** When participant leaves */
        room.on("participantDisconnected", detachParticipant);

      } catch (error) {
        console.error("Failed to join room:", error);
      }
    };

    const attachParticipant = (participant, room) => {
      if (participant.sid === room.localParticipant.sid) return;

      const container = remoteVideosRef.current;
      console.log("Attach participant:", participant.identity);

      const subscribeTrack = (track) => {
        const el = track.attach();
        el.style.width = "300px";
        container.appendChild(el);
      };

      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          subscribeTrack(publication.track);
        }
      });

      participant.on("trackSubscribed", subscribeTrack);
      participant.on("trackUnsubscribed", track => {
        track.detach().forEach(el => el.remove());
      });
    };

    const detachParticipant = (participant) => {
      participant.tracks.forEach(publication => {
        if (publication.track) {
          publication.track.detach().forEach(el => el.remove());
        }
      });
      console.log("Participant disconnected:", participant.identity);
    };

    joinRoom();

    /** Cleanup on exit */
    return () => {
      if (room) {
        room.localParticipant.tracks.forEach(publication => {
          publication.track.stop();
          publication.track.detach().forEach(el => el.remove());
        });
        room.disconnect();
      }
    };
  }, [roomCode]);

  return (
    <div className="flex flex-row space-x-10 justify-center items-center">
      <div className="flex flex-col space-y-2 text-2xl font-semibold">
        <h3>Your Camera</h3>
        <video ref={localVideoRef} autoPlay muted
               style={{ width: 300, backgroundColor: "black", borderRadius: "10px" }}
        />
      </div>
      <div className="flex flex-col space-y-2 text-2xl font-semibold">
        <h3>Other Participants</h3>
        <div
          ref={remoteVideosRef}
          style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        />
      </div>
    </div>
  );
};

export default MainRoom;
