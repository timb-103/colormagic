export function getSampleImages(): string[] {
  return [
    'https://images.unsplash.com/photo-1503785640985-f62e3aeee448',
    'https://images.unsplash.com/photo-1498354136128-58f790194fa7',
    'https://images.unsplash.com/photo-1520763185298-1b434c919102',
    'https://images.unsplash.com/photo-1495467033336-2effd8753d51',
    'https://images.unsplash.com/photo-1728937237820-7b20e8e65db0',
    'https://images.unsplash.com/photo-1491591462767-3b91b2a19487',
    'https://images.unsplash.com/photo-1542279836-8369a296a95b',
    'https://images.unsplash.com/photo-1484766280341-87861644c80d'
  ].map(v => `${v}?q=70&w=240&auto=format&fit=crop`);
}

export async function getImageBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // Base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return null;
  }
}
