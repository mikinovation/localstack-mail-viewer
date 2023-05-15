'use client'

import {useState} from "react";
import {Message} from "@/type/message";
import MailTable from "@/components/MailTable";

export default function Content() {
    const [mail, setMail] = useState<Message | null>(null)

    return (
        <div className="flex gap-12">
            <div className="w-1/2">
                <MailTable selectedMail={mail} setMail={setMail}/>
            </div>
            <div className="w-1/3 p-4">
                <h1 className="text-2xl font-bold">{mail?.Subject}</h1>
                {mail?.Body.text_part}
            </div>
        </div>
    )
}