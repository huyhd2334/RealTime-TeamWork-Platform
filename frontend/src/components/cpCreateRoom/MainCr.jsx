import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { io } from "socket.io-client";
import { Presentation, Video } from 'lucide-react'

const socket = io("https://live-meeting.onrender.com", { withCredentials: true });

const MainCr = () => {
  const peerIdRef = useRef(null);
  const [idRoom, setIdRoom] = useState("");
  const [code, setCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const localVideo = useRef();
  const remoteVideo = useRef();
  const pcRef = useRef();
  const [joined, setJoined] = useState(false);

  const handleCreateRoom = async () => {
    const response = await api.get("/createroom");

    if (response.data.message) {
      setIdRoom(response.data.code);
      setRoomCode(response.data.code);
      toast.success("Room created!");
      await initLocalStream();
      setJoined(true);
      socket.emit("join-room", response.data.code);
    } else {
      toast.error("Failed to create room!");
    }
  };

  const handleJoinRoom = async () => {
    if (!code) return toast.error("Enter a room code!");
    setRoomCode(code);
    setJoined(true);
    await initLocalStream();
    socket.emit("join-room", code);
  };

  const initLocalStream = async () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:global.turn.twilio.com:3478?transport=udp",
          username: "public",
          credential: "public"
        }
      ]
    });

    pcRef.current = pc;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.current.srcObject = stream;
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate && peerIdRef.current) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          to: peerIdRef.current
        });
      }
    };

    pc.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };
  };

  useEffect(() => {
    socket.on("user-joined", async (peerId) => {
      peerIdRef.current = peerId;
      const pc = pcRef.current;
      if (!pc) return;

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("offer", { sdp: offer, to: peerId, roomCode });
    });

    socket.on("offer", async (data) => {
      const pc = pcRef.current;
      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("answer", { sdp: answer, to: data.from });
    });

    socket.on("answer", async (data) => {
      const pc = pcRef.current;
      await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    });
    socket.on("ice-candidate", async (data) => {
      const pc = pcRef.current;
      if (data.candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          console.error(err);
        }
      }
    });
    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, []);
  return (
    <div>
      { joined ? (
      <div>
        <Button onClick={()=>{setJoined(pre => !pre)}}> Leave Room </Button>
        <div style={{display: 'flex', gap: 20, marginTop: 20}}>
          <video className='rounded-4xl' ref={localVideo} autoPlay playsInline muted style={{width: 300, backgroundColor: 'black'}} />
          <video className='rounded-4xl' ref={remoteVideo} autoPlay playsInline style={{width: 300, backgroundColor: 'black'}} />
        </div>
      </div>
      ) : (
     <div className='flex flex-row justify-center items-center space-x-25'>
     <div className='flex flex-col justify-center items-center space-y-4'>
        <Button className="w-40 h-15 text-xl font-bold" onClick={handleCreateRoom}> Get ID Room </Button>
         <div className='flex flex-col text-sm'>
            <a>Your id here:</a>
            {idRoom !== "" 
            ?<a className='bg-indigo-500 text-white w-50 h-10  rounded-lg flex justify-center items-center gap-2 text-center text-lg font-semibold'> {idRoom} </a> 
            :<button type="button" className="bg-indigo-500 text-white w-50 h-10 text-xl font-semibold px-4 py-2 rounded-lg flex items-center gap-2" disabled>
                    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none" >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Processing…
                </button>
            }
          </div>
          <Video className=" w-20 h-20"/>
        </div>
        <div className='flex flex-col justify-center items-center space-y-4 transform translate-y-[-2px] mt-1'>
          <Button className="w-40 h-15 text-xl font-bold" onClick={handleJoinRoom}> Join Room </Button>
          <div className='flex flex-col text-sm'>
            <a>Enter Room id</a>
            <input id="coderoom" type="text" 
                className='bg-white rounded-lg h-10 pl-2 w-50 text-xl font-semibold'
                placeholder='Room id'
                value={code}
                onChange={(e) => setCode(e.target.value)}/>
          </div>
          <Presentation className=" w-20 h-20"/>
        </div>
       </div>
      )}
    </div>
  )
}

export default MainCr