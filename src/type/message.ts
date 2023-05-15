export type Message = {
    Id: string
    Timestamp: string
    Region: string
    Source: string
    Destination: {
        ToAddresses: string[]
    }
    Subject: string
    Body: {
        text_part: string
        html_part: string | null
    }
}