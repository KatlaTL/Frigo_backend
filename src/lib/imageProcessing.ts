
/**
 * Converts a File to a buffer
 * @param imageFile - File
 * @returns Buffer
 */
export const convertImageToBuffer = async (imageFile: File) => {
    const arrayBuffer = await imageFile.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

/**
 * Converts a buffer to base64 image
 * @param buffer 
 * @returns Base64 image
 */
export const convertBufferToBase64 = (buffer: Buffer) => {
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}