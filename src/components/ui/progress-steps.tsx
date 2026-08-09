import { Text, View } from "react-native";

const steps = ["Pengenalan", "Kenal\nNombor", "Nilai\nTempat", "Susun &\nBanding", "Bundar", "Latihan"];

export function ProgressSteps() {
  return (
    <View className="flex-row items-start">
      {steps.map((step, index) => {
        const isDone = index < 3;
        const isCurrent = index === 3;

        return (
          <View className="flex-1 items-center" key={step}>
            <View className="w-full flex-row items-center">
              {index > 0 ? (
                <View className={`h-1 flex-1 ${index <= 3 ? "bg-success" : "bg-gray-200"}`} />
              ) : (
                <View className="flex-1" />
              )}
              <View
                className={`size-9 items-center justify-center rounded-full ${
                  isDone ? "bg-success" : isCurrent ? "bg-primary-600" : "border-2 border-gray-200 bg-white"
                }`}
              >
                <Text className={`font-bold text-label ${isDone || isCurrent ? "text-white" : "text-gray-500"}`}>
                  {isDone ? "✓" : index + 1}
                </Text>
              </View>
              {index < steps.length - 1 ? (
                <View className={`h-1 flex-1 ${index < 3 ? "bg-success" : "bg-gray-200"}`} />
              ) : (
                <View className="flex-1" />
              )}
            </View>
            <Text className={`pt-2 text-center font-semibold text-caption ${isCurrent ? "text-primary-600" : "text-navy-900"}`}>
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
