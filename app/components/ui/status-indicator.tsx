export default function StatusIndicator({ status }: { status: string }) {
    const statusText = {
      saving: 'Saving...',
      saved: 'Saved',
      error: 'Error saving',
      idle: ''
    }[status];
  
    if (!statusText) return null;
    
    return (
      <div className="text-sm text-gray-500">
        {statusText}
      </div>
    );
}