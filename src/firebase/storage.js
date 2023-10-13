import { sbrp } from "./init";
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
const storage = getStorage(sbrp)

export const uploadFiles = async (filePath, file) => {
    const fileRef = ref(storage, filePath)
    return await uploadBytes(fileRef, file)
}

export const getProfilePicURL = async (id) => {
    const profilePicRef = ref(storage, `profilepics/${id}.png`)
    const url = await getDownloadURL(profilePicRef)

    return url
}

export const getFile = async (filename) => {
    const fileref = ref(storage, filename)
    const response = await getDownloadURL(fileref)
    return response
}