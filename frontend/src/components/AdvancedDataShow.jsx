const AdvancedDataShow = ({ totalRuns, totalWickets, totalCatches }) => {
  return (
    <div className="text-center p-5 border-2 rounded-sm">
      Runs: {totalRuns} Wickets: {totalWickets} Catches: {totalCatches}
    </div>
  );
};

export default AdvancedDataShow;
