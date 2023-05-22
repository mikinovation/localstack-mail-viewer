'use client'

import {Message} from "@/type/message";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MailTable({ setMail, selectedMail }: { setMail: (mail: Message) => void, selectedMail: Message | null}) {
    const { data } = useSWR<{
        messages: Message[]
    }>('http://localhost:4566/_localstack/ses', fetcher)

    if(!data || data.messages.length === 0) {
        return <div>No mails</div>
    }

    const reversedMessages = [...data.messages].reverse()

    return (
        <table className="max-w-full text-left text-sm font-light overflow-x-scroll">
            <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                <th scope="col" className="p-2">Time</th>
                <th scope="col" className="p-2">Subject</th>
                <th scope="col" className="p-2">To</th>
                <th scope="col" className="p-2">From</th>
            </tr>
            </thead>
            <tbody>
            {reversedMessages.map((message) => (
                <tr className={`border-b dark:border-neutral-500 ${message.Id === selectedMail?.Id ? 'bg-white' : ''}`} key={message.Id} onClick={() => setMail(message)}>
                    <td className="whitespace-nowrap p-2">{message.Timestamp}</td>
                    <td className="whitespace-nowrap p-2">{message.Subject}</td>
                    <td className="whitespace-nowrap p-2">{message.Destination.ToAddresses.map((to) => <li key={to}>{to}</li>)}</td>
                    <td className="whitespace-nowrap p-2">{message.Source}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}