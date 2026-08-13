import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const PARTICLE_SIZE = 30;

const PARTICLES = [
  { color: "#FFD23F", angle: -70, distance: 174 },
  { color: "#70D31A", angle: -35, distance: 222 },
  { color: "#5422D6", angle: -6, distance: 240 },
  { color: "#FF6B9D", angle: 24, distance: 210 },
  { color: "#3FC1FF", angle: 58, distance: 180 },
  { color: "#FF9F43", angle: -108, distance: 198 },
  { color: "#B15CFF", angle: 108, distance: 198 },
  { color: "#70D31A", angle: 150, distance: 174 },
];

/** A short-lived, non-interactive burst of colored particles for celebrating a correct answer. */
export function ConfettiBurst() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, { duration: 1400, easing: Easing.out(Easing.cubic), toValue: 1, useNativeDriver: true }).start();
  }, [progress]);

  return (
    <View pointerEvents="none" style={{ alignItems: "center", height: 0, justifyContent: "center", width: "100%" }}>
      {PARTICLES.map((particle, index) => {
        const radians = (particle.angle * Math.PI) / 180;
        const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, Math.sin(radians) * particle.distance] });
        const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [0, -Math.cos(radians) * particle.distance] });
        const opacity = progress.interpolate({ inputRange: [0, 0.15, 0.75, 1], outputRange: [0, 1, 1, 0] });
        const scale = progress.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0.3, 1, 0.55] });
        return (
          <Animated.View
            key={index}
            style={{
              backgroundColor: particle.color,
              borderRadius: 999,
              height: PARTICLE_SIZE,
              opacity,
              position: "absolute",
              transform: [{ translateX }, { translateY }, { scale }],
              width: PARTICLE_SIZE,
            }}
          />
        );
      })}
    </View>
  );
}
