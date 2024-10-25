import type {RoleType} from "@/components/resume-card";
import Image from "next/image";
import React from "react";

export function Role({role}: { role: RoleType }) {
    let startLabel =
        typeof role.start === 'string' ? role.start : role.start.label
    let startDate =
        typeof role.start === 'string' ? role.start : role.start.dateTime

    let endLabel = typeof role.end === 'string' ? role.end : role.end.label
    let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

    return (
        <li className="flex gap-4">
            <div
                className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
                <Image src={role.logo} alt={role.company} className="h-8 w-8" unoptimized/>
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-black">
                    {role.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-black">
                    {role.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                    className="ml-auto text-xs text-black"
                    aria-label={`${startLabel} until ${endLabel}`}
                >
                    <time dateTime={startDate}>{startLabel}</time>
                    {' '}
                    <span aria-hidden="true">—</span>{' '}
                    <time dateTime={endDate}>{endLabel}</time>
                </dd>
            </dl>
        </li>
    )
}
