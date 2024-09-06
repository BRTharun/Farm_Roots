export default class AuthService {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_HOST + "/auth/signin",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to call Signin Api");
      }
      const data = await response.json();
      return { data, error: null };
    } catch (e: any) {
      return { data: null, error: e };
    }
  }
}
