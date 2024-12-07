export async function savePrompt(title: string, content: string): Promise<void> {
  try {
    const prompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    const existingPromptIndex = prompts.findIndex((prompt: any) => prompt.title === title);

    const newPrompt = {
      date: Date.now().toString(),
      title,
      content,
    };

    if (existingPromptIndex > -1) {
      prompts[existingPromptIndex] = newPrompt;
    } else {
      prompts.push(newPrompt);
    }

    localStorage.setItem('prompts', JSON.stringify(prompts));
  } catch (error) {
    console.error('Failed to save prompt:', error);
    throw error;
  }
}

export async function loadPrompts(): Promise<Array<{ date: string; title: string; content: string }>> {
  try {
    const prompts = JSON.parse(localStorage.getItem('prompts') || '[]');
    return prompts.map((prompt: any) => ({
        date: prompt.date,
      title: prompt.title,
      content: prompt.content,
    }));
  } catch (error) {
    console.error('Failed to load prompts:', error);
    return [];
  }
}