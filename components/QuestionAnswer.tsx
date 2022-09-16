const QuestionAnswer = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => (
  <div className="mb-4">
    <div className="font-bold">{question}</div>
    <div>{answer}</div>
  </div>
)

export default QuestionAnswer
