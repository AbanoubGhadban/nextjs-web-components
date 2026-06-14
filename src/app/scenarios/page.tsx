import ScenariosTester from "./ScenariosTester";

export default function ScenariosPage() {
  return (
    <div className="max-w-5xl space-y-8" data-testid="scenarios-page">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Shadow DOM Scenarios
        </h1>
        <p className="text-gray-600 text-lg">
          Interactive demonstrations of Shadow DOM modes, encapsulation
          boundaries, CSS piercing, slot projection, and event propagation.
        </p>
      </div>

      <ScenariosTester />
    </div>
  );
}
