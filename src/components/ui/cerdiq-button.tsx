import { Pressable, Text } from "react-native";

type ButtonVariant = "primary" | "secondary" | "success" | "disabled";

type CerdiqButtonProps = {
  label: string;
  variant?: ButtonVariant;
  onPress?: () => void;
};

const buttonClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-600 shadow-button",
  secondary: "border-2 border-primary-500 bg-white",
  success: "bg-success",
  disabled: "bg-gray-200",
};

const labelClasses: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-primary-600",
  success: "text-white",
  disabled: "text-gray-500",
};

export function CerdiqButton({
  label,
  variant = "primary",
  onPress,
}: CerdiqButtonProps) {
  const disabled = variant === "disabled";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`min-h-14 items-center justify-center rounded-full px-7 active:scale-[0.98] ${buttonClasses[variant]}`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className={`font-extrabold text-button ${labelClasses[variant]}`}>
        {label}
      </Text>
    </Pressable>
  );
}
