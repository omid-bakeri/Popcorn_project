import { useState } from "react";
export default function StarRating() {
  return (
    <>
      <Star />
    </>
  );
}
function Star() {
  const [rating, setRating] = useState(0);
  function handdleRatingFunction(rating) {
    setRating(rating);
  }
  return (
    <div className="stars">
      {Array.from({ length: 10 }, (_, i) => (
        <StarLink key={i} onClick={() => handdleRatingFunction(i + 1)} />
      ))}
      <div className="text">{rating || ""}</div>
    </div>
  );
}

function StarLink({ onClick }) {
  return <i class="ph-duotone ph-star"></i>;
}
