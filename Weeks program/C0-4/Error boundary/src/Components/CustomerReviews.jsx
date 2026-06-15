function CustomerReviews() {
  const reviews = null;
  // Simulating an error by setting reviews to null

  if (!reviews) {
    return (
      <div>
        <h3>Reviews</h3>
        <p>No reviews available.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <p key={index}>{review}</p>
      ))}
    </div>
  );
}

export default CustomerReviews;

