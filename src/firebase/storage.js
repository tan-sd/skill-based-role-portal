import { sbrp } from "./init";
import { getStorage, ref, uploadBytes} from 'firebase/storage'
const storage = getStorage(sbrp)

export const uploadFiles = async (filePath, file) => {
    const fileRef = ref(storage, filePath)
    return await uploadBytes(fileRef, file)
}