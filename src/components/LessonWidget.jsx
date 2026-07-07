import FinanceWidgets from './widgets/FinanceWidgets.jsx';
import ElectronicsWidgets from './widgets/ElectronicsWidgets.jsx';
import RoboticsWidgets from './widgets/RoboticsWidgets.jsx';

const REGISTRY = {
  ...FinanceWidgets,
  ...ElectronicsWidgets,
  ...RoboticsWidgets,
};

export default function LessonWidget({ card, accent }) {
  const Widget = REGISTRY[card.id];
  if (!Widget) return null;

  return (
    <section
      aria-label="Interactive demo"
      className="mb-4 rounded-xl px-4 py-4 border"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <p className="text-sm font-medium uppercase tracking-wider mb-3" style={{ color: accent }}>
        ⚡ Try it yourself
      </p>
      <Widget accent={accent} />
    </section>
  );
}
