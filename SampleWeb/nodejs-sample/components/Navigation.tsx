import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      {/* 배경 흰색, 하단 테두리, 그림자 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 최대 너비 1280px, 가로 중앙 정렬, 좌우 여백 */}
        <div className="flex justify-between h-16">
          {/* 높이 4rem, 아이템 양 끝 정렬 */}
          <div className="flex">
            {/* 왼쪽: 로고 */}
            <Link
              href="/"
              className="flex items-center px-4 text-lg font-semibold text-gray-900 hover:text-blue-600"
            >
              {/**
                flex items-center: 세로 중앙 정렬
                px-4: 좌우 여백 1rem
                text-lg: 텍스트 크기 1.125rem
                font-semibold: 폰트 굵기 600
                hover:text-blue-600: 마우스 올렸을 때 파란색
              */}
              포켓몬 API
            </Link>

            {/* 메뉴 항목들 */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/**
                hidden: 기본값은 숨김 (모바일)
                sm:flex: 작은 화면 이상에서 flex 표시
                space-x-8: 메뉴 사이 간격 2rem
              */}
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                홈
              </Link>
              <Link
                href="/pokemon"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                포켓몬 목록
              </Link>
              <Link
                href="/stats"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                통계
              </Link>
              <Link
                href="/api-docs"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                API 문서
              </Link>
              <Link
                href="/health"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                시스템 상태
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}