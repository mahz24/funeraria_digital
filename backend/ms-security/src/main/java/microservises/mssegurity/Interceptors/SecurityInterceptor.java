package microservises.mssegurity.Interceptors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import microservises.mssegurity.Services.ValidatorsService;

@Component
public class SecurityInterceptor implements HandlerInterceptor {
    @Autowired
    private ValidatorsService validatorService;

    @SuppressWarnings("null")
    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response,
            Object handler)
            throws Exception {
        boolean success = this.validatorService.validationRolePermission(request, request.getRequestURI(),
                request.getMethod());
        return success;
    }

    @SuppressWarnings("null")
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        // Lógica a ejecutar después de que se haya manejado la solicitud por el
        // controlador
    }

    @SuppressWarnings("null")
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
            Exception ex) throws Exception {
        // Lógica a ejecutar después de completar la solicitud, incluso después de la
        // renderización de la vista
    }
}
