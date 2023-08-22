export const randomJoke = async (req: any, res: any): Promise<void> => {
    try {
     const response = await fetch('https://api.chucknorris.io/jokes/random');
     const data = await response.json();
     console.log(data);
     res.json(data.value);
    } catch (error) {
     res.status(500).json(error);
    }
 };