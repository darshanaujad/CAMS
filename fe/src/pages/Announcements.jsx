import React from "react";
import { Megaphone } from "lucide-react";

const announcements = [
  {
    title: "Mid-Semester Exams Schedule Released",
    date: "10 March 2026",
    description:
      "The mid-semester exam schedule has been published. Students are advised to check their portal for details.",
  },
  {
    title: "New Course Materials Available",
    date: "5 March 2026",
    description:
      "Teachers have uploaded new course resources for Computer Science and Mathematics subjects.",
  },
  {
    title: "Holiday Notice",
    date: "1 March 2026",
    description:
      "The institution will remain closed on 8th March due to a public holiday.",
  },
];

const Announcements = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Latest Announcements
          </h1>
          <p className="text-gray-600 mt-3">
            Stay updated with important academic updates and notices
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {announcements.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mb-5">
                <Megaphone size={24} />
              </div>

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

              <p className="text-sm text-gray-400 mb-3">{item.date}</p>

              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Announcements;