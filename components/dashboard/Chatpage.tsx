// app/(main)/chats/page.js
export default function ChatsPage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Your Chats History
      </h1>
      <p className="text-gray-600">
        Here you will see a list of your previous conversations.
      </p>
      {/* Add your chats list component here */}
    </div>
  );
}
