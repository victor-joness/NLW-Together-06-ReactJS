import { FormEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';

import "../styles/auth.css"

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


export function NewRoom(){
    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState("");
    const navigate = useNavigate();

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ""){
            return;
        }

        const roomRef = database.ref("rooms");

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        navigate(`/rooms/${firebaseRoom.key}`);
    } 

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp; A ao-vivo</strong>
                <p>Tire duvidas da sua audiencia em tempo real</p>
            </aside>
            <main >
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask"/>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom} >
                        <input 
                        type="text" 
                        placeholder="Nome da Sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit" >Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to='/'>Click aqui</Link></p>
                </div>
            </main>
        </div>
    )
}