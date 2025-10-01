'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Clock3, Terminal, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Skeleton } from './ui/skeleton';

type ToolCallStatus = 'pending' | 'success' | 'error';

interface ToolCallProps {
  toolName: string;
  callId?: string;
  args?: unknown;
  result?: unknown;
  error?: unknown;
  status?: ToolCallStatus;
  isLoading?: boolean;
}

const STATUS_META: Record<ToolCallStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className:
      'border border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-300/60 dark:bg-amber-950 dark:text-amber-100',
  },
  success: {
    label: 'Completed',
    className:
      'border border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-300/60 dark:bg-emerald-950 dark:text-emerald-100',
  },
  error: {
    label: 'Failed',
    className:
      'border border-rose-200 bg-rose-100 text-rose-800 dark:border-rose-300/60 dark:bg-rose-950 dark:text-rose-100',
  },
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const safeStringify = (data: unknown) => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Failed to stringify tool call data', error);
    return 'Unable to stringify payload';
  }
};

const renderLeafValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return <span className="text-xs text-muted-foreground">null</span>;
  }

  if (typeof value === 'boolean') {
    return (
      <span className="rounded-md border px-2 py-0.5 text-xs uppercase tracking-wide">
        {value ? 'TRUE' : 'FALSE'}
      </span>
    );
  }

  if (typeof value === 'number') {
    return <span className="font-mono text-sm">{value}</span>;
  }

  if (typeof value === 'string') {
    return <span className="text-sm leading-relaxed">{value}</span>;
  }

  if (Array.isArray(value) || isPlainObject(value)) {
    return (
      <pre className="max-h-48 overflow-auto rounded-md bg-muted/70 p-3 text-xs">
        {safeStringify(value)}
      </pre>
    );
  }

  return <span className="text-sm">{String(value)}</span>;
};

const renderStructuredContent = (data: unknown) => {
  if (data === null || data === undefined) {
    return (
      <div className="rounded-md border border-dashed p-4 text-xs text-muted-foreground">
        No data available for this section.
      </div>
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <div className="rounded-md border border-dashed p-4 text-xs text-muted-foreground">
          Empty array
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={`${index}-${typeof item}`} className="space-y-2 rounded-md border p-3">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Item {index + 1}
            </div>
            {renderStructuredContent(item)}
          </div>
        ))}
      </div>
    );
  }

  if (isPlainObject(data)) {
    return (
      <div className="max-h-80 overflow-auto rounded-md border p-4">
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-4 border-b pb-3 last:border-0">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {key}
              </div>
              <div className="col-span-2 space-y-2 text-sm">
                {renderLeafValue(value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return renderLeafValue(data);
};

export function ToolCall({
  toolName,
  callId,
  args,
  result,
  error,
  status,
  isLoading = false,
}: ToolCallProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<'request' | 'response'>(
    result ? 'response' : 'request',
  );
  const [viewMode, setViewMode] = useState<'structured' | 'json'>('structured');

  const derivedStatus = useMemo<ToolCallStatus>(() => {
    if (status) {
      return status;
    }

    if (!isLoading && (error || (isPlainObject(result) && 'error' in (result as Record<string, unknown>)))) {
      return 'error';
    }

    if (!isLoading && result !== undefined) {
      return 'success';
    }

    return 'pending';
  }, [status, isLoading, error, result]);

  const displayName = useMemo(() => {
    return toolName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }, [toolName]);

  const statusMeta = STATUS_META[derivedStatus];

  const requestJson = useMemo(() => safeStringify(args), [args]);
  const responseJson = useMemo(() => safeStringify(error ?? result), [error, result]);

  const hasResponseData = Boolean(result) || Boolean(error);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 items-start gap-3">
            <div className="rounded-full border border-border/70 bg-muted p-1">
              <Wrench className="size-4" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base leading-tight">{displayName}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMeta.className}`}>
                  {statusMeta.label}
                </span>
                {callId ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                    <Terminal className="size-3" />
                    {callId}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            View tool call details
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" />
            Recorded in conversation
          </div>
        </div>

        {isExpanded ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Tabs
                value={activeSection}
                onValueChange={(value) => setActiveSection(value as 'request' | 'response')}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full grid-cols-2 sm:w-64">
                  <TabsTrigger value="request">Request</TabsTrigger>
                  <TabsTrigger value="response" disabled={!hasResponseData && !isLoading}>
                    Response
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as 'structured' | 'json')}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid w-full grid-cols-2 sm:w-56">
                  <TabsTrigger value="structured">Structured</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {activeSection === 'request' ? (
              viewMode === 'json' ? (
                <pre className="max-h-80 overflow-auto rounded-md bg-muted p-4 text-xs">
                  {requestJson}
                </pre>
              ) : (
                renderStructuredContent(args)
              )
            ) : null}

            {activeSection === 'response' ? (
              isLoading ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Awaiting response...</div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ) : hasResponseData ? (
                viewMode === 'json' ? (
                  <pre className="max-h-96 overflow-auto rounded-md bg-muted p-4 text-xs">
                    {responseJson}
                  </pre>
                ) : (
                  <div className="space-y-4">
                    {error ? (
                      <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-400/50 dark:bg-rose-950/60 dark:text-rose-100">
                        Tool execution failed: {typeof error === 'string' ? error : responseJson}
                      </div>
                    ) : null}
                    {renderStructuredContent(result)}
                  </div>
                )
              ) : (
                <div className="rounded-md border border-dashed p-4 text-xs text-muted-foreground">
                  No response recorded for this tool call.
                </div>
              )
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
