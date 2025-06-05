

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
    if (!title.trim() || !content.trim()) {
        console.log('Save skipped: title or content is empty');
        return;
    }
    
    try {
        console.log('Saving post:', { id, title: title.substring(0, 20) + '...', contentLength: content.length });
        const url = '/api/posts';
        const method = id ? 'PUT' : 'POST';
        const body = JSON.stringify({ title, content, id, published: false });
        
        console.log('Sending request:', { method, url, body: JSON.parse(body) });
        
        const res = await fetch(url, {
            method,
            headers: {'Content-Type': 'application/json'},
            body
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status}, body: ${errorText}`);
        }
        
        const response = await res.json();
        console.log('Save successful, response:', response);
        
        if (!response.data?.id) {
            console.error('Unexpected response format:', response);
            throw new Error('Invalid response format: missing data.id');
        }
        
        return response.data.id;
    } catch (error) {
        console.error('Error saving draft:', error);
        throw error; // Re-throw to be handled by the caller
    }
}

export async function deletePost(id: number) {
    try {
        await fetch('/api/posts', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id })
        });
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

export async function draftPost(id: number) {
    try {
        let response = await fetch(`/api/posts?id=${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const { data } = await response.json();
        response = await fetch('/api/posts', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id, title: data.title, content: data.content, published: false })
        }); 
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}