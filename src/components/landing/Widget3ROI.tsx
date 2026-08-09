import { useMemo, useState } from "react";
import { fmtNum, fmtRub } from "../../lib/format";
import { useI18n } from "../../lib/i18n";

const AUTOMATION = 0.62;
const QUALITY_LOSS = 0.18;
const QUALITY_RECOVERY = 0.4;
const WEEKS = 47;
const IMPLEMENTATION_BASE = 850_000;
const IMPLEMENTATION_PER_PERSON = 34_000;

export function Widget3ROI({ onCta }: { onCta: () => void }) {
  const { lang, t } = useI18n();
  const [team, setTeam] = useState(35);
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(1800);
  const [calculated, setCalculated] = useState(false);

  const copy =
    lang === "ru"
      ? {
          calculate: "Рассчитать иллюстративный сценарий",
          waiting: "Заполните исходные данные и запустите расчёт",
          waitingText:
            "До нажатия кнопки сайт не показывает экономию и окупаемость. Значения 62%, 18% и 40% — явные допущения иллюстративного сценария, а не прогноз для вашей компании.",
          formula:
            "Формула: сотрудники × часы рутины × 47 рабочих недель × стоимость часа. Эффект = 62% этой базы + возврат 40% от условных 18% потерь на ошибки.",
          sensitivity:
            "Чувствительность: если фактическая доля автоматизации или возврата потерь ниже, экономия уменьшается пропорционально, а срок окупаемости растёт.",
          stop: "Не начинать проект, если нет владельца процесса, исходных данных, измеримой метрики или приемлемого сценария интеграции и безопасности.",
          recalc: "Пересчитать после изменения исходных данных",
        }
      : {
          calculate: "Calculate the illustrative scenario",
          waiting: "Enter assumptions and run the calculation",
          waitingText:
            "No savings or payback result is shown before you click calculate. The 62%, 18%, and 40% values are explicit illustrative assumptions, not a forecast for your company.",
          formula:
            "Formula: employees × routine hours × 47 working weeks × hourly cost. Impact = 62% of that base plus recovery of 40% of an assumed 18% loss from error and rework.",
          sensitivity:
            "Sensitivity: lower actual automation or recovery reduces savings proportionally and extends payback.",
          stop: "Do not start without a process owner, baseline data, a measurable success metric, and an acceptable integration and security approach.",
          recalc: "Recalculate after changing assumptions",
        };

  const calc = useMemo(() => {
    const current = team * hours * WEEKS * rate;
    const automationSaving = current * AUTOMATION;
    const errorSaving = current * QUALITY_LOSS * QUALITY_RECOVERY;
    const total = automationSaving + errorSaving;
    const implementation = Math.min(
      4_500_000,
      IMPLEMENTATION_BASE + team * IMPLEMENTATION_PER_PERSON,
    );
    const payback = Math.max(1, Math.round((implementation / total) * 12));
    const afterPct = Math.max(8, Math.round((1 - AUTOMATION) * 100));
    return {
      current,
      automationSaving,
      errorSaving,
      total,
      implementation,
      payback,
      afterPct,
    };
  }, [team, hours, rate]);

  const change = (setter: (value: number) => void) => (value: number) => {
    setter(value);
    setCalculated(false);
  };

  return (
    <div className="rounded-md border border-[var(--color-border-emphasis)] bg-[var(--color-bg-elevated)]/60 p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-6">
          <SliderRow
            label={t.roi.teamSize}
            value={team}
            min={5}
            max={200}
            step={1}
            onChange={change(setTeam)}
            display={`${team}`}
          />
          <SliderRow
            label={t.roi.hours}
            value={hours}
            min={2}
            max={25}
            step={1}
            onChange={change(setHours)}
            display={`${hours} ${lang === "ru" ? "ч" : "h"}`}
          />
          <SliderRow
            label={t.roi.rate}
            value={rate}
            min={500}
            max={5000}
            step={100}
            onChange={change(setRate)}
            display={`${fmtNum(rate)} ₽`}
          />
          <button
            type="button"
            onClick={() => setCalculated(true)}
            className="w-full rounded-md border border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo-soft)] px-5 py-3 text-[14px] font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-soft-hover)]"
          >
            {calculated ? copy.recalc : copy.calculate}
          </button>
          <div className="space-y-3 border-t border-[var(--color-border-subtle)] pt-5 text-[11px] leading-relaxed text-[var(--color-text-mono)]">
            <p>{copy.formula}</p>
            <p>{copy.sensitivity}</p>
            <p>{copy.stop}</p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono text-[var(--color-text-mono)]">
            {t.roi.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--color-border-emphasis)] underline-offset-4 hover:text-[var(--color-text-strong)]"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>

        {!calculated ? (
          <div className="flex min-h-[360px] items-center rounded-md border border-dashed border-[var(--color-border-emphasis)] bg-[var(--color-surface-sunken)] p-6">
            <div>
              <div className="font-mono text-[11px] text-[var(--color-accent-indigo)]">
                {copy.waiting}
              </div>
              <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                {copy.waitingText}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3" aria-live="polite">
            <Stat label={t.roi.currentCost} value={fmtRub(calc.current)} tone="amber" />
            <Stat
              label={t.roi.saving}
              value={fmtRub(calc.automationSaving)}
              tone="teal"
              sub="62% scenario"
            />
            <Stat label={t.roi.errorSaving} value={fmtRub(calc.errorSaving)} tone="teal" small />
            <div className="rounded-md border border-[var(--color-accent-teal)]/40 bg-[var(--color-accent-teal)]/8 px-4 py-4">
              <div className="mb-1 font-mono text-[10px] uppercase text-[var(--color-accent-teal)]">
                {t.roi.totalSaving}
              </div>
              <div className="font-mono text-[30px] leading-none md:text-[36px]">
                {fmtRub(calc.total)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Output label={t.roi.implCost} value={fmtRub(calc.implementation)} />
              <Output label={t.roi.payback} value={`${calc.payback} ${t.roi.months}`} />
            </div>
            <button
              type="button"
              onClick={onCta}
              className="mt-2 w-full rounded-md bg-[var(--color-btn-primary)] px-5 py-3 text-[14px] font-medium text-[var(--color-btn-primary-fg)] hover:bg-[var(--color-btn-primary-hover)]"
            >
              {lang === "ru" ? "Разобрать ИТ-ситуацию" : "Discuss your IT situation"}{" "}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  display: string;
}) {
  return (
    <div>
      <label className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[13px] text-[var(--color-text-secondary)]">{label}</span>
        <span className="font-mono text-[13px]">{display}</span>
      </label>
      <input
        type="range"
        className="techno"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </div>
  );
}

function Output({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-4 py-3">
      <div className="mb-1 font-mono text-[9px] uppercase text-[var(--color-text-mono)]">
        {label}
      </div>
      <div className="font-mono text-[16px]">{value}</div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  sub,
  small,
}: {
  label: string;
  value: string;
  tone: "teal" | "amber";
  sub?: string;
  small?: boolean;
}) {
  const color = tone === "teal" ? "var(--color-accent-teal)" : "var(--color-accent-amber)";
  return (
    <div className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface-sunken)] px-4 py-3">
      <div className="mb-1 font-mono text-[9px] uppercase text-[var(--color-text-mono)]">
        {label}
      </div>
      <div className="flex items-baseline gap-3">
        <div
          className="font-mono leading-none"
          style={{ color, fontSize: small ? "20px" : "24px" }}
        >
          {value}
        </div>
        {sub && (
          <span className="font-mono text-[11px]" style={{ color }}>
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}
