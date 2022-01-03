export function text_print_console() {}

export async function text_prompt_console(type: string) {
    // This is difficult to properly mock, because we have no idea what type of input the user is expecting their program to receive
    // So we'll just guess and hope nothing too bad happens
    return type === "number" ? 0.5 : "testing";
}
