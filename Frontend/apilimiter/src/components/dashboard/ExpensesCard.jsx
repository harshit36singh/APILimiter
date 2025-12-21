import React from "react";

const ExpensesCard = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white";

  const contacts = [
    { name: "Natali Craig", initials: "NC", status: "online" },
    { name: "Drew Cano", initials: "DC", status: "offline" },
    { name: "Andi Lane", initials: "AL", status: "online" },
    { name: "Koray Okumus", initials: "KO", status: "online" },
    { name: "Kate Morrison", initials: "KM", status: "offline" },
  ];

  return (
    <div className={`${cardBgClass} rounded-2xl p-6 border ${borderClass}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${textClass}`}>
          Contacts
        </h3>
      </div>

      <div className="space-y-4">
        {contacts.map((contact, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
                }`}>
                  {contact.initials}
                </div>
                {contact.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-current rounded-full"
                       style={{ borderColor: isDarkMode ? '#111827' : '#ffffff' }}></div>
                )}
              </div>
              <span className={`text-sm font-medium ${textClass}`}>
                {contact.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesCard;