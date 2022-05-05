import DatePickerInput from './DatePickerInput';
import LogoutButton from './LogoutButton';
import { MonthlyButton } from './MonthlyButton';
import { SortButton } from './SortButton';
import SyncButton from './SyncButton';

export default function ControlPanel() {
  return (
    <div className="border-b border-slate-900/10 dark:border-slate-300/10">
      <div className="m-2 relative flex items-center">
        <input
          type="image"
          src="./favicon-96x96.png"
          onClick={() => window.location.reload()}
          className="w-10 align-bottom mr-2"
        />
        <DatePickerInput isStart={true} />
        <i className="bi bi-arrow-right text-xl ml-3 mr-3" />
        <DatePickerInput isStart={false} />
        <div className="flex items-center border-l border-slate-200 ml-6 pl-3 dark:border-slate-600">
          <MonthlyButton isLast={true} />
          <MonthlyButton isLast={false} />
          <SortButton />
          <LogoutButton />
        </div>
        <SyncButton />
      </div>
    </div>
  );
}
