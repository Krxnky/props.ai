use client
import Image from "next/image";
import { Dropdown } from '@nextui-org/react';

export default function Navbar() {
    return (
        
        <div className='flex min-w-screen bg-zinc-800 drop-shadow-xl justify-center'>
            
            <Image src={"/props_ai_temp_logo.png"} width={50} height={50}>

            </Image>
            <Dropdown>
                <Dropdown.Button flat>Trigger</Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                    <Dropdown.Item key="new">New file</Dropdown.Item>
                    <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                    <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                    <Dropdown.Item key="delete" color="error">
                    Delete file
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}