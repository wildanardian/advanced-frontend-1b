import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface PaymentTimerContextValue {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface PaymentTimerProps {
  initialSeconds: number;
  children: ReactNode;
  onComplete?: () => void;
  className?: string;
}

interface PaymentTimerLabelProps {
  children?: ReactNode;
  className?: string;
}

interface PaymentTimerDisplayProps {
  className?: string;
}

const PaymentTimerContext = createContext<PaymentTimerContextValue | null>(null);

function usePaymentTimer() {
  const context = useContext(PaymentTimerContext);

  if (!context) {
    throw new Error("PaymentTimer components must be used within PaymentTimer");
  }

  return context;
}

function getTimeParts(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);

  return {
    hours: Math.floor(safeSeconds / 3600),
    minutes: Math.floor((safeSeconds % 3600) / 60),
    seconds: safeSeconds % 60,
  };
}

function formatTime(value: number) {
  return value.toString().padStart(2, "0");
}

function PaymentTimerRoot({
  initialSeconds,
  children,
  onComplete,
  className = "",
}: PaymentTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(() => Math.max(0, initialSeconds));
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const safeInitialSeconds = Math.max(0, initialSeconds);
    const deadline = Date.now() + safeInitialSeconds * 1000;

    hasCompletedRef.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemainingSeconds(safeInitialSeconds);

    const updateTimer = () => {
      const nextRemainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemainingSeconds(nextRemainingSeconds);

      if (nextRemainingSeconds === 0 && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onCompleteRef.current?.();
      }
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(intervalId);
  }, [initialSeconds]);

  const timeParts = getTimeParts(remainingSeconds);

  return (
    <PaymentTimerContext.Provider
      value={{ ...timeParts, isExpired: remainingSeconds === 0 }}
    >
      <section
        className={`flex min-h-[82px] w-full flex-col items-center justify-center rounded-lg bg-background-paper px-4 py-4 text-white ${className}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {children}
      </section>
    </PaymentTimerContext.Provider>
  );
}

function PaymentTimerLabel({
  children = "Lakukan Pembayaran Sebelum",
  className = "",
}: PaymentTimerLabelProps) {
  usePaymentTimer();

  return (
    <p className={`mb-3 text-center text-base text-light-main ${className}`}>
      {children}
    </p>
  );
}

function PaymentTimerDisplay({ className = "" }: PaymentTimerDisplayProps) {
  const { hours, minutes, seconds } = usePaymentTimer();
  const timeUnits = [
    { value: hours, label: "Jam" },
    { value: minutes, label: "Menit" },
    { value: seconds, label: "Detik" },
  ];

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="contents">
          {index > 0 && <span className="text-light-secondary">:</span>}
          <div className="flex min-w-[58px] items-center justify-center gap-2 rounded bg-background-body px-4 py-2.5">
            <span className="font-700 tabular-nums text-2xl">{formatTime(unit.value)}</span>
            <span className="text-lg text-light-secondary">{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const PaymentTimer = Object.assign(PaymentTimerRoot, {
  Label: PaymentTimerLabel,
  Display: PaymentTimerDisplay,
});

// eslint-disable-next-line react-refresh/only-export-components
export { PaymentTimer };
export default PaymentTimer;
