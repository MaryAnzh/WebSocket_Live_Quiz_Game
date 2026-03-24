export type Question = {
    text: string;
    /** exactly 4 options */
    options: string[];
    /** index of the correct option (0-3) */
    correctIndex: number;
    /** time limit for the question in seconds */
    timeLimitSec: number;
}