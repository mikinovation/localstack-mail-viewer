'use client'

import {useState} from "react";
import {Message} from "@/type/message";
import MailTable from "@/components/MailTable";

export default function Content() {
    const [mail, setMail] = useState<Message | null>(null)

    return (
        <div className="flex gap-12 w-full">
            <div className="w-1/2 overflow-x-scroll">
                <MailTable selectedMail={mail} setMail={setMail}/>
            </div>
            <div className="w-1/2">
                <h1 className="text-2xl font-bold">{mail?.Subject}</h1>
                <p className="break-words">{mail?.Body.text_part}</p>
            </div>
        </div>
    )
}