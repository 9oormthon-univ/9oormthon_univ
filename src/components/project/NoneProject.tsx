import { Button } from "@goorm-dev/vapor-components";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

interface NoneProjectProps {
  type: "upload" | "project";
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MotionDiv = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className={styles.emptyContainer}
    initial="hidden"
    animate="visible"
    transition={{ duration: 1 }}
    variants={fadeInVariants}
  >
    {children}
  </motion.div>
);

export default function NoneProject({ type }: NoneProjectProps) {
  return (
    <MotionDiv>
      <h3>
        {type === "project"
          ? "3번째 주인공 모집 완료!"
          : "우리 팀 프로젝트를 업로드 해주세요!"}
      </h3>
      <p>새롭게 완성될 멋진 프로젝트들을 기대해주세요!</p>
      {type !== "project" && (
        <Button className="mt-4" size="xl">
          프로젝트 업로드
        </Button>
      )}
    </MotionDiv>
  );
}
