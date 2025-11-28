import React, { useState, useEffect, useRef } from "react";
import Video from "twilio-video";
import api from "@/lib/axios";
import { toast } from "sonner";

const MainRoom = ({ roomCode }) => {
  const localVideoRef = useRef();
  const remoteVideosRef = useRef();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    toast.success("joined room", roomCode)
    if (!roomCode) return; 

    const joinRoom = async () => {
      try {
        // token backend
        const res = await api.get(
          `/tokentwilio?room=${roomCode}&identity=user${Math.floor(Math.random() * 1000)}`
        );
        const token = res.data.token;
        console.log("Twilio token response:", res.data);

        // connect Twilio Room
        const room = await Video.connect(token, { video: { width: 640 }, audio: true });
        setRoom(room);

        // attach local video
        const localTrack = Array.from(room.localParticipant.videoTracks.values())[0].track;
        localTrack.attach(localVideoRef.current);

        // attach các participant đã có sẵn
        room.participants.forEach(participant => attachParticipant(participant));

        // khi có participant mới join
        room.on("participantConnected", participant => attachParticipant(participant));

        // khi participant rời
        room.on("participantDisconnected", participant => detachParticipant(participant));
      } catch (err) {
        console.error("Failed to join room:", err);
      }
    };

    const attachParticipant = participant => {
      if (participant === room.localParticipant) return; // bỏ qua chính bạn
      const container = remoteVideosRef.current;
      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          const video = publication.track.attach();
          container.appendChild(video);
        }
      });
      participant.on("trackSubscribed", track => {
        container.appendChild(track.attach());
      });
      participant.on("trackUnsubscribed", track => {
        track.detach().forEach(el => el.remove());
      });
    };

    const detachParticipant = participant => {
      participant.tracks.forEach(publication => {
        if (publication.track) {
          publication.track.detach().forEach(el => el.remove());
        }
      });
    };

    joinRoom();

    return () => {
        if (room) {
          room.localParticipant.tracks.forEach(publication => {
            publication.track.stop();
            publication.track.detach().forEach(el => el.remove());
          });
          room.disconnect();
        }
      };
    }, [roomCode])

  return (
    <div style={{display: "flex", gap: "10px"}}>
      <div className="absolute top-50 left-20">
        <h3>Local Video</h3>
        <video ref={localVideoRef} autoPlay muted style={{ width: 300, backgroundColor: "black" }} />
      </div>
      <div className="absolute top-50 left-100">
        <h3>Remote Videos</h3>
        <div ref={remoteVideosRef} style={{display: "flex", flexWrap: "wrap", gap: 10}} />
      </div>
    </div>
  );
};

export default MainRoom;
