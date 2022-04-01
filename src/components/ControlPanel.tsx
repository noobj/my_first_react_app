import DatePickerInput from './DatePickerInput';

type Props = {
  start: string;
  end: string;
  changeHandler: (isStart: boolean, dateStr: string) => void;
};

export default function ControlPanel(props: Props) {
  return (
    <div className="border-b border-slate-900/10 dark:border-slate-300/10">
      <div className="m-2 relative flex items-center">
        <input
          type="image"
          src="./favicon-96x96.png"
          onClick={() => window.location.reload()}
          className="w-10 align-bottom mr-2"
        />
        <DatePickerInput isStart={true} value={props.start} onChange={props.changeHandler} />
        <i className="bi bi-arrow-right text-xl ml-3 mr-3" />
        <DatePickerInput isStart={false} value={props.end} onChange={props.changeHandler} />
      </div>
    </div>
  );
}
