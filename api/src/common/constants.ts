export const ROLE_USER = 'user';
export const ROLE_VENDOR = 'vendor';
export function trimText(text: string) {
    text.trim();
    return text;
}
export const PROCESSOR = {
    QUEUES: {
        MAIN: "main"
    },
    JOBS: {
        EMAIL_SEND: "email_send",
        VIDEO_JOB: "video-job",
        AUDIO_JOB: "audio-job",
    }
}

