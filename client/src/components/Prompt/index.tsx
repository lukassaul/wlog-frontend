import * as React from "react";
import {
  useBeforeUnload,
  unstable_useBlocker as useBlocker,
} from "react-router-dom";

function usePrompt(
  message: string | null | undefined | false,
  { beforeUnload }: { beforeUnload?: boolean } = {}
) {
  let blocker = useBlocker(
    React.useCallback(
      () => (typeof message === "string" ? !window.confirm(message) : false),
      [message]
    )
  );
  let prevState = React.useRef(blocker.state);
  React.useEffect(() => {
    if (blocker.state === "blocked") {
      blocker.reset();
    }
    prevState.current = blocker.state;
  }, [blocker]);

  useBeforeUnload(
    React.useCallback(
      (event) => {
        if (beforeUnload && typeof message === "string") {
          event.preventDefault();
          event.returnValue = message;
        }
      },
      [message, beforeUnload]
    ),
    { capture: true }
  );
}

export default usePrompt;