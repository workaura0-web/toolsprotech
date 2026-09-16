import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-toolsprotech-pathname", request.nextUrl.pathname);
	const segments = request.nextUrl.pathname.split("/").filter(Boolean);
	requestHeaders.set(
		"x-toolsprotech-tool-slug",
		segments[0] === "tools" && segments.length === 2 ? segments[1] : "",
	);

	return NextResponse.next({
		request: { headers: requestHeaders },
	});
}

export const config = {
	matcher: ["/tools/:path*"],
};