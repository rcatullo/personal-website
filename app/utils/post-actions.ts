

export async function publish(title: string, content: string, id?: number) {
    if (!title.trim() || !content.trim()) return;
    
    try {
        await fetch('/api/posts', {
            method: id ? 'PUT' : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, content, id, published: true })
        });
    } catch (error) {
        console.error('Error submitting post:', error);
    }
}

export async function save(title: string, content: string, id?: number): Promise<number | undefined> {
    if (!title.trim() || !content.trim()) return;
    
    try {
        const res = await fetch('/api/posts', {
            method: id ? 'PUT' : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, content, id, published: false })
        });
        const response = await res.json();
        return response.data.id;
    } catch (error) {
        console.error('Error saving draft:', error);
        return;
    }
}