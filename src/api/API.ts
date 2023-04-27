import ApiManager from "./ApiManager"

export const login = async (data: unknown) =>{
    try {
        const result = await ApiManager('/auth/signin',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            data: data
        })
        return result
    } catch (error) {
        return (error as Error).message;
    }
}