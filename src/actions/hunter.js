export const RECEIVE_HUNTER = "RECEIVE_HUNTER";

export function receiveHunter(hunter) {
    return {
        type: RECEIVE_HUNTER,
        hunter
    }
}