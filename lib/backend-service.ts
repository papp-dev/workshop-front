import process from "process";
import axios from "axios";

export type Person = {
  id?: string;
  name: string;
  weight: number;
  height: number;
  imcIndex?: number;
  imcClassification?: string;
};

export async function createPerson(
  person: Person,
): Promise<Person | undefined> {
  console.log(`creating person ${person}`);
  try {
    const response = await axios.post<Person>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/people`,
      {
        name: person.name,
        weight: person.weight,
        height: person.height,
      },
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    return undefined;
  }
}

export async function listPeople(): Promise<Array<Person>> {
  try {
    console.log(`url: ${process.env.NEXT_PUBLIC_BACKEND_UR}`)
    const response = await axios.get<Array<Person>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/people`,
    );
    return response.data;
  } catch {
    return [];
  }
}
