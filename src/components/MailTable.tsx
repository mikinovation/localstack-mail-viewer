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

    return (
        <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                <th scope="col" className="px-6 py-4">Subject</th>
                <th scope="col" className="px-6 py-4">From</th>
                <th scope="col" className="px-6 py-4">To</th>
                <th scope="col" className="px-6 py-4">Time</th>
            </tr>
            </thead>
            <tbody>
            {data.messages.map((message) => (
                <tr className={`border-b dark:border-neutral-500 ${message.Id === selectedMail?.Id ? 'bg-white' : ''}`} key={message.Id} onClick={() => setMail(message)}>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{message.Subject}</td>
                    <td className="whitespace-nowrap px-6 py-4">{message.Source}</td>
                    <td className="whitespace-nowrap px-6 py-4">{message.Destination.ToAddresses.map((to) => <li key={to}>{to}</li>)}</td>
                    <td className="whitespace-nowrap px-6 py-4">{message.Timestamp}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}