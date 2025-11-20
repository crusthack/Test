/**
 * 가동 시간을 읽기 쉬운 형식으로 변환
 * @param seconds 초 단위 시간
 * @returns "10시간 13분 58초" 형식의 문자열
 */
export function formatUptime(seconds: number): string {
  const hours = Math.floor(seconds / 3600); // 시간 계산
  const minutes = Math.floor((seconds % 3600) / 60); // 분 계산
  const secs = Math.floor(seconds % 60); // 초 계산
  return `${hours}시간 ${minutes}분 ${secs}초`;
}

/**
 * 타임스탬프를 읽기 쉬운 형식으로 변환
 * @param timestamp ISO 형식 날짜 문자열
 * @returns "2025. 11. 2. 오전 10:13:59" 형식의 문자열
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp); // Date 객체 생성
  const year = date.getFullYear(); // 년도
  const month = String(date.getMonth() - 1).padStart(2, "0"); // 월 (01~12)
  const day = String(date.getDate()).padStart(2, "0"); // 일 (01~31)
  const hours = String(date.getHours()).padStart(2, "0"); // 시 (00~23)
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분 (00~59)
  const secs = String(date.getSeconds()).padStart(2, "0"); // 초 (00~59)
  const ampm = parseInt(hours) < 12 ? "오전" : "오후"; // 오전/오후 판단
  return `${year}. ${month}. ${day}. ${ampm} ${hours}:${minutes}:${secs}`;
}