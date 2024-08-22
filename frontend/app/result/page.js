import SuspenseWrapper from "../../components/SuspenseWrapper"; 
import ResultPage from "../../components/ResultPage"; 
const ResultPageWithSuspense = () => (
  <SuspenseWrapper>
    <ResultPage />
  </SuspenseWrapper>
);

export default ResultPageWithSuspense;
