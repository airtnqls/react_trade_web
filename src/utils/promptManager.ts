export async function savePrompt(title: string, content: string): Promise<void> {
  try {
    const prompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    
    prompts.push({
      id: Date.now().toString(),
      title,
      fileName,
      content
    });
    
    localStorage.setItem('prompts', JSON.stringify(prompts));
  } catch (error) {
    console.error('Failed to save prompt:', error);
    throw error;
  }
}

export async function loadPrompts(): Promise<Array<{ title: string; content: string }>> {
  try {
    const prompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    return prompts.map((prompt: any) => ({
      title: prompt.title,
      content: prompt.content
    }));
  } catch (error) {
    console.error('Failed to load prompts:', error);
    return [];
  }
}