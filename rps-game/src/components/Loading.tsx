/**
 * Loading component displays a spinner and a message.
 * Props:
 * - message: string to show below the spinner
 */
export default function Loading({ message = "LOADING..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-white mb-4"></div>
      <span className="text-xl font-bold">{message}</span>
    </div>
  );
}
