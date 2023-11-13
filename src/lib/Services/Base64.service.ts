import { Buffer } from "buffer";

export class Base64Service {
    public static encode(input: string): string {
        return Buffer.from(input, "binary").toString("base64");
    }

    public static decode(input: string): string {
        return Buffer.from(input, "base64").toString("binary");
    }
}